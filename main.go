package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

const htmlFileName = "./home.html"

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

	http.ServeFile(w, r, htmlFileName)
}

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/", serveHome)
	r.PathPrefix("/lib/").Handler(
		http.StripPrefix("/lib/", http.FileServer(http.Dir("lib/"))),
	)

	err := http.ListenAndServe(":7000", r)
	if err != nil {
		log.Fatal(err)
	}

}
