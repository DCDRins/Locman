const useLocation = (location: string, verifiedPath: string, subdiv: number = 0): boolean => {
  const splitter = location.split('/');
  splitter.splice(0, subdiv + 1);
  const verifiedSplitter = verifiedPath.split('/').splice(subdiv + 1);
  for (let i = 0, length = verifiedSplitter.length; i < length; i++) {
    if (splitter.includes(verifiedSplitter[i])) {
      return true;
    }
  }
  return false;
}

export default useLocation
