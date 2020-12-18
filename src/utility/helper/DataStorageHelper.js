


export const CreateDispatcherObj = (type, payload, storeloc, value) => {
    return {
      payload: payload,
      type: type,
      strloc: storeloc,
      value: value
    };
  }