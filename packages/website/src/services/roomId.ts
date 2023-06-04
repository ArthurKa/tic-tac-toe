import shortid from 'shortid';

export const getRoomId = () => {
  const roomId = (
    false
      || new URLSearchParams(window.location.search).get('roomId')
      || localStorage.getItem('roomId')
      || shortid()
  );

  localStorage.setItem('roomId', roomId);

  const searchParams = new URLSearchParams(window.location.search);
  if(searchParams.get('roomId') !== roomId) {
    searchParams.set('roomId', roomId);
    window.history.replaceState({}, '', `${window.location.origin}?${searchParams}`);
  }

  return roomId;
};
