


export const CreateDispatcherObj = (type, payload, storeloc, value) => {
    return {
      payload: payload,
      type: type,
      strloc: storeloc,
      value: value
    };
  }

  // export const StorageConnector = (mapStateToProps, dispatchProps=null) => {
  //   return compose(connect(mapStateToProps, dispatchProps, null, {forwardRef: true}));
  // }