const express = require("express");
const app = express();
var _http = require('http');
var http = require('http').Server(app);
var io = require('socket.io')(http);
const exec = require('child_process').exec;
const cmd = require('node-cmd');
 
app.use(express.static('src'));
  
http.listen(3000, function () {
    console.log('Check out the store at http://localhost:3000');
});
 
var addresses = [];
var command = '';
//lắng nghe sự kiện connection
io.on('connection', function (socket) {
    command = 'snak call Buying getBuyers'
	//chạy câu lệnh command trả về biến stdout là list địa chỉ các mẫu đồng hồ
	exec(command,function(err,stdout,stderr){
		if(!err){

			var array = [];
			//chuyển thành mảng
			array = JSON.parse(stdout);
			for (var i = 0; i < array.length; i++ )
			{
				if (array[i].toString() == '8B05651240631E5724CC380D7D249C1FC63F320B')
				{
					addresses.push(i);
				}
			}
			console.log(stdout);		
		}

		else{
			console.log(stderr);
		}
	});
	//phát thông báo địa chỉ các mẫu đồng hồ đã được mua
    io.emit('sold', addresses);
 
    socket.on('buy', function (msg) {
		//chạy câu lệnh command kiểm tra mẫu đồng hồ có người mua chưa, nếu chưa thì gán địa chỉ của nó cho 1 account người mua
    	command = 'snak call Buying buy '+ msg.toString();
    	console.log(command);
    	exec(command, async function(err,stdout,stderr){
    		if(err){
    			console.log(stderr);
    		}
    		else
    		{	
				// chạy câu lệnh cmd lấy danh sách các địa chỉ mẫu đồng hồ
				command = 'snak call Buying getBuyers'
				exec(command,function(err,stdout,stderr){
					if(!err){

						var array = [];
						array = JSON.parse(stdout);
						for (var i = 0; i < array.length; i++ )
						{	
							//nếu mẫu đồng hồ này đã được mua thì lưu vào mảng
							if (array[i].toString() == '8B05651240631E5724CC380D7D249C1FC63F320B')
							{
								addresses.push(i);
							}
						}
						console.log(stdout);
						//phát thông báo những mẫu đồng hồ đã được mua
						io.emit('sold', addresses);
	
					}

					else{
						console.log(stderr);
					}
				});	    			
    		}
			
		});
    });
});

// lắng nghe sự kiện disconnect
io.on('disconnect', function(socket) {
	console.log('socket disconeceted');
})
