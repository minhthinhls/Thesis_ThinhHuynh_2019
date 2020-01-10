const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');
const root = require('app-root-path').path;

const buildPath = path.resolve(root, 'build/contracts/');
const contractsFolder = path.resolve(root, 'contracts/');

const createEmptyFolder = (folderPath) => {
    fs.emptyDirSync(path.resolve(root, folderPath));
};

const buildSources = () => {
    const sources = {};
    const contractsFiles = fs.readdirSync(contractsFolder);

    contractsFiles.forEach(file => {
        const contractFullPath = path.resolve(contractsFolder, file);
        sources[file] = {
            content: fs.readFileSync(contractFullPath, 'utf8')
        };
    });

    return sources;
};

const solcInput = {
    language: "Solidity",
    sources: buildSources(),
    settings: {
        optimizer: {
            enabled: true
        },
        evmVersion: "byzantium",
        outputSelection: {
            "*": {
                "": [
                    "legacyAST",
                    "ast"
                ],
                "*": [
                    "abi",
                    "evm.bytecode.object",
                    "evm.bytecode.sourceMap",
                    "evm.deployedBytecode.object",
                    "evm.deployedBytecode.sourceMap",
                    "evm.gasEstimates"
                ]
            }
        }
    }
};

const compileContracts = () => {
    const compiledContracts = JSON.parse(solc.compile(JSON.stringify(solcInput))).contracts;

    for (let contract in compiledContracts) { // O(N) complexity !
        for (let contractName in compiledContracts[contract]) { // O(1) complexity !
            fs.outputJsonSync(
                path.resolve(buildPath, contractName + '.json'),
                compiledContracts[contract][contractName],
                {
                    spaces: 2
                }
            )
        }
    }
};

const run = () => {
    try {
        createEmptyFolder('build/contracts/');
        compileContracts();
    } catch (e) {
        console.log(e);
    }
};

module.exports = createEmptyFolder;

run();
