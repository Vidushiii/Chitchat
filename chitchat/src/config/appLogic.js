export const getSender = (users, user) => {
    return users[0]._id === user._id
      ? users[1].name
        ? users[1].name
        : users[1].firstName
      : users[0].name
      ? users[0].name
      : users[0].firstName;
  };

  export const getSenderPic = (users, user) => {
    return users[0]._id === user._id
      ? users[1].pic
      : users[0].pic;
  };
  
  export const isSameSender = (messages, m, i, userId) => {
    return (
      i < messages.length - 1 &&
      (messages[i + 1].sender._id !== m.sender._id ||
        messages[i + 1].sender._id === undefined) &&
      messages[i].sender._id !== userId
    );
  };
  
  export const isLastMessage = (messages, i, userId) => {
    return (
      i === messages.length - 1 &&
      messages[messages.length - 1].sender._id !== userId &&
      messages[messages.length - 1].sender._id
    );
  };

  export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
  };

  export const getName = (data) => {
    return data && data.name ? data.name : data.firstName + " " + data.lastName;
  }