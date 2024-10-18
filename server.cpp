#include <crow.h>
#include <nlohmann/json.hpp>
#include "Database.h"

std::string readFile(const std::string& filePath) {
    std::ifstream file(filePath);
    std::stringstream buffer;
    buffer << file.rdbuf();
    return buffer.str();
}

int main(int argc, char const *argv[])
{
    crow::SimpleApp app;
    Database db("db.jason");


CROW_ROUTE(app, "/")([](){
    return crow::response(readFile("templates/index.html"));
});

CROW_ROUTE(app, "/data").methods(crow::HTTPMethod::GET)([&db]{
    return crow::response{db.getData().dump()};
});


CROW_ROUTE(app, "/data/add").methods(crow::HTTPMethod::POST)([&db](const crow::request& req) {
    auto jsonData = nlohmann::json::parse(req.body);
    db.addData(jsonData);
    return crow::response{200};
});

CROW_ROUTE(app, "/data/update/<int>")
    .methods(crow::HTTPMethod::PUT)([&db](const crow::request& req, int id) {
        CROW_LOG_INFO << "Update ID: " << id;
        CROW_LOG_INFO << "Body: " << req.body;
        auto jsonData = nlohmann::json::parse(req.body);
        db.updateData(id, jsonData);
        return crow::response{200};
    });

CROW_ROUTE(app, "/data/delete/<int>")
    .methods("DELETE"_method)([&db](int id) {
        CROW_LOG_INFO << "Delete ID: " << id;
        db.deleteData(id);
        return crow::response{200};
    });


    app.port(18080).multithreaded().run();
    
}

