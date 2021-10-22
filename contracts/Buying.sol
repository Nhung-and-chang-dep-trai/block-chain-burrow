pragma solidity ^0.4.18;

contract Buying {

	address[16] public buyers;

	// buy a watch
	function buy(uint watchId) public returns (uint) {
		require(watchId >= 0 && watchId <= 15);
		buyers[watchId] = msg.sender;
		return watchId;
	}
	
	// retrive buyers list
	function getBuyers() public view returns (address[16] memory) {
  		return buyers;
	}

}
