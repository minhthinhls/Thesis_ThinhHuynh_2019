/* This file is used to test the compilation of
Solidity Smart Contracts without using Truffle */
const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');
const root = require('app-root-path');

const buildPath = `${root}/build/contracts/`;
const contractsFolder = `${root}/contracts/`;

const createEmptyFolder = (folderPath) => {
    fs.emptyDirSync(folderPath);
};

const buildSources = () => {
    const sources = {};
    const contractsFiles = fs.readdirSync(contractsFolder);

    contractsFiles.filter(item => item.includes('.sol')).forEach(file => {
        const contractFullPath = `${contractsFolder}/${file}`;
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
    Object.values(compiledContracts).forEach((contract) => {
        const name = Object.keys(contract)[0];
        fs.outputJsonSync(
            path.resolve(buildPath, `${name}.json`),
            contract[name],
            {
                spaces: 2
            }
        )
    });
};

const run = () => {
    try {
        createEmptyFolder(buildPath);
        compileContracts();
    } catch (e) {
        console.log(e);
    }
};

module.exports = createEmptyFolder;

run();
