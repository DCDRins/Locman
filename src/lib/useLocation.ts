export const useLocation = (location: string = window.location.pathname.replace('https://', ''), verifiedPath: string, subdiv: number = 0): boolean => {
  const splitter = location.split('/');
  // if (verifiedPath) {
  return splitter[++subdiv] === verifiedPath.split('/').join('')
  // }
  // return splitter[++subdiv];
}