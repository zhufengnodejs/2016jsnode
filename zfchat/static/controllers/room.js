angular.module('techNodeApp').controller('RoomCtrl',['$rootScope','$scope','$routeParams', 'socket', function($rootScope,$scope,$routeParams, socket) {

    socket.emit('getAllRooms', {
        _roomId: $routeParams._roomId
    })

    socket.on('roomData.' + $routeParams._roomId, function(room) {
        $scope.room = room;
    })

    //添加消息
    socket.on('messages.add', function (message) {
        $scope.room.messages.push(message);
    });

    //添加用户
    socket.on('users.add', function (user) {
        $scope.room.users.push(user);
    })

    //从用户列表中移除此用户
    socket.on('users.remove', function (user) {
        var _userId = user._id;
        $scope.room.users = $scope.room.users.filter(function (user) {
            return user._id != _userId
        })
    })

    //添加消息
    socket.on('messageAdded', function(message) {
        $scope.room.messages.push(message);
    })

    //进入房间
    socket.on('joinRoom', function (join) {
        $scope.room.users.push(join.user);
    })

    //路由更改时离开房间
    $scope.$on('$routeChangeStart', function() {
        socket.emit('leaveRoom', {
            user: $rootScope.me,
            room: $scope.room
        })
    })

    //离开房间
    socket.on('leaveRoom', function(leave) {
        var _userId = leave.user._id;
        $scope.room.users = $scope.room.users.filter(function(user) {
            return user._id != _userId
        })
    })
}])