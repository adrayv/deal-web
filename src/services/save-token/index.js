export const getSaveToken = () => {
  const saveToken = localStorage.getItem('deal-game');
  if (saveToken) {
    return JSON.parse(saveToken);
  } else return null;
};

export const storeSaveToken = (gameId, playerId) => {
  const saveToken = JSON.stringify({ gameId, playerId });
  localStorage.setItem('deal-game', saveToken);
};
