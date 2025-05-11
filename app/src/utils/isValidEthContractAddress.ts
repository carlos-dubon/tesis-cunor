export function isValidEthContractAddress(address: string) {
  const isValidFormat = /^0x[a-fA-F0-9]{40}$/.test(address);

  if (!isValidFormat) {
    return false;
  }

  return true;
}
