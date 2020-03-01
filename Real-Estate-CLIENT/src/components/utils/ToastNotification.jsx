import React from 'react';
import {useToasts} from 'react-toast-notifications';

const ToastButton = ({children, onSuccess, onClick, ...props}) => {
  const {addToast} = useToasts();

  const onClickHandler = () => {
    new Promise((resolve) => {
      resolve(onClick());
    }).then(() => {
      addToast(onSuccess, {
        appearance: 'success',
        autoDismiss: true,
      });
    }).catch((error) => {
      addToast(error.message, {
        appearance: 'error',
        autoDismiss: true,
      });
    });
  };

  return (
    <button {...props} onClick={() => onClickHandler()}>
      {children}
    </button>
  )
};

export {ToastButton};
