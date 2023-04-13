let usersList = []

export const connectionHandler = (socket) => {
    console.log("New connection with id:", socket.id)

    socket.emit("welcome", { message: `Welcome ${socket.id}` })


    socket.on("setUsername", (payload) => {
        console.log(payload)
        usersList.push({ username: payload.username, socketId: socket.id })
        socket.emit("loggedIn", usersList)
        socket.broadcast.emit("updatedUsersList", usersList)
    })

    socket.on("sendMessage", (message) => {
        socket.broadcast.emit("newMessage", message)
    })

    socket.on("disconnect", () => {
        usersList = usersList.filter(user => user.socketId !== socket.id)
        socket.broadcast.emit("updatedUsersList", usersList)
    })






}