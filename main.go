package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
)

const htmlHomeFile = "./home.html"
const htmlRoomFile = "./room.html"

var wsUpgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

var writeMessage chan []byte

func serveHome(w http.ResponseWriter, r *http.Request) {
	log.Println(r.URL)

	if r.URL.Path != "/" {
		http.Error(w, "Not found", http.StatusNotFound)
		return
	}
	if r.Method != "GET" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	http.ServeFile(w, r, htmlHomeFile)
}

func serveRoom(w http.ResponseWriter, r *http.Request) {
	log.Println(r.URL)

	if r.URL.Path != "/room-10-56-brewing-company-knox" {
		http.Error(w, "Not found", http.StatusNotFound)
		return
	}
	if r.Method != "GET" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	http.ServeFile(w, r, htmlRoomFile)
}

func serveRoomWS(w http.ResponseWriter, r *http.Request) {
	// Create websocket connection
	conn, err := wsUpgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("prolem upgrading connection to WebSockets %v\n", err)
		return
	}

	fmt.Println("ws connected")
	go readFromWS(conn)
	go writeToWS(conn, writeMessage)

}
func readFromWS(c *websocket.Conn) {
	defer func() {
		c.Close()
	}()
	for {
		_, msg, err := c.ReadMessage()
		if err != nil {
			log.Printf("could not read message from ws: %v", err)
			break
		}
		fmt.Printf("websocket message: %s\n", msg)

	}
}
func writeToWS(c *websocket.Conn, message chan []byte) {

	defer func() {
		c.Close()
	}()
	for {
		msg := <-message
		fmt.Printf("msg: %v", msg)
		// write payload from hub to ws, if there is an error break out of loop and close connection
		err := c.WriteMessage(1, msg)
		if err != nil {
			log.Printf("could not write message to ws: %v\n", err)
			break
		}
	}
}

func main() {
	roomId := "10-56-brewing-company-knox"
	writeMessage = make(chan []byte)
	defer close(writeMessage)
	r := mux.NewRouter()

	r.HandleFunc("/", serveHome)
	r.PathPrefix("/lib/").Handler(
		http.StripPrefix("/lib/", http.FileServer(http.Dir("lib/"))),
	)
	r.HandleFunc(fmt.Sprintf("/room-%v", roomId), serveRoom)
	r.HandleFunc(fmt.Sprintf("/room-%v/ws", roomId), serveRoomWS)

	go func(w chan []byte) {
		for i := 0; i < 10; i++ {
			writeMessage <- []byte(string("hello world"))
			time.Sleep(time.Second * 1)

		}
	}(writeMessage)

	err := http.ListenAndServe(":7000", r)
	if err != nil {
		log.Fatal(err)
	}

}
