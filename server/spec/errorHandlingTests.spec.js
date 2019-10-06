process.env.NODE_ENV = "test";
const { expect } = require("chai");
const request = require("supertest");
const app = require("../app");
const connection = require("../../connection");
const chai = require("chai");
const chaiSorted = require("chai-sorted");
chai.use(chaiSorted);

after(() => {
  connection.destroy();
});

describe("/not-valid-route", () => {
  it("returns a 404 error when an invalid route is used", () => {
    return request(app)
      .get("/hellocheeky")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).to.equal("route not found");
      });
  });
});

describe("/api", () => {
  describe("/users/:username", () => {
    describe("GET:", () => {
      it("404: Username is not in the database", () => {
        return request(app)
          .get("/api/users/not-a-user-name")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal(
              "username:not-a-user-name is not in the database"
            );
          });
      });
    });
  });
  describe("/articles/:article_id", () => {
    describe("GET:", () => {
      it("400: invalid article_id type", () => {
        return request(app)
          .get("/api/articles/not-an-int")
          .expect(400)
          .then(({ body }) => {
            // console.log(body.msg);
            expect(body.msg).to.equal("Invalid input for:not-an-int");
          });
      });
      it("400: article_id is not in the database", () => {
        return request(app)
          .get("/api/articles/7965")
          .expect(404)
          .then(({ body }) => {
            // console.log(body);
            expect(body.msg).to.equal("article_id:7965 is not in the database");
          });
      });
    });
    describe("PATCH:", () => {
      it("400: Invalid body request - no inc_votes on the body", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({})
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal(
              "Body does not contain property: inc_values"
            );
          });
      });
      it("400: Invalid body request - inc_votes isnt a number", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: "not an int" })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("inc_values is not a number: not an int");
          });
      });
      it("400: Invalid body request - other properties are on the body", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: 3, wrong: "property" })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal(
              "Body must only have 1 property: inc_values"
            );
          });
      });
      it("400: Invalid request - article_id is not an int", () => {
        return request(app)
          .patch("/api/articles/not-an-int")
          .send({ inc_votes: 3 })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("Invalid input for:not-an-int");
          });
      });
      it("404: Invalid request - article_id is not in the database", () => {
        return request(app)
          .patch("/api/articles/1241")
          .send({ inc_votes: 3 })
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("article_id:1241 is not in the database");
          });
      });
    });
  });

  describe("/articles/:article_id/comments", () => {
    describe("POST:", () => {
      it("400: no keys on the body", () => {
        return request(app)
          .post("/api/articles/1/comments")
          .send({})
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("Invalid body for:{}");
          });
      });
      it("400: wrong keys on the body", () => {
        return request(app)
          .post("/api/articles/1/comments")
          .send({ not: "correct" })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal('Invalid body for:{"not":"correct"}');
          });
      });
      it("400: Invalid request - article_id is not an int", () => {
        return request(app)
          .post("/api/articles/not-an-int/comments")
          .send({
            username: "butter_bridge",
            body: "Test Comment"
          })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("Invalid input for:not-an-int");
          });
      });
      it("404: Not Found - article_id is not in the database", () => {
        return request(app)
          .post("/api/articles/1241/comments")
          .send({
            username: "butter_bridge",
            body: "Test Comment"
          })
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal(
              "Article_id is not found in the database:1241"
            );
          });
      });
    });
    describe("GET", () => {
      it("404: Article_id is not in the database", () => {
        return request(app)
          .get("/api/articles/1241/comments")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("article_id:1241 is not in the database");
          });
      });
      it("400: Invalid request - article_id is not not an int", () => {
        return request(app)
          .get("/api/articles/not-an-int/comments")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("Invalid input for:not-an-int");
          });
      });
    });
  });
  describe("/api/articles", () => {
    describe("GET", () => {
      describe("Bad Queries", () => {
        it("400: order must equal either asc or desc", () => {
          return request(app)
            .get("/api/articles?order=wrong")
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal(
                "Order must equal 'asc' or 'desc: wrong"
              );
            });
        });
        it("404: No articles by author/no author in the database", () => {
          return request(app)
            .get("/api/articles?author=lurker")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal("No articles by: lurker ");
            });
        });
        it("404: No articles by topic/ no topic in database", () => {
          return request(app)
            .get("/api/articles?topic=wrong")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal("No articles by: wrong");
            });
        });
      });
    });
  });
  describe("/api/comments/:comments", () => {
    describe("PATCH", () => {
      it("400: Invalid body request - no inc_votes on the body", () => {
        return request(app)
          .patch("/api/comments/1")
          .send({})
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal(
              "Body does not contain property: inc_values"
            );
          });
      });
      it("400: Invalid body request - inc_votes isnt a number", () => {
        return request(app)
          .patch("/api/comments/1")
          .send({ inc_votes: "not an int" })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("inc_values is not a number: not an int");
          });
      });
      it("400: Invalid body request - other properties are on the body", () => {
        return request(app)
          .patch("/api/comments/1")
          .send({ inc_votes: 3, wrong: "property" })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal(
              "Body must only have 1 property: inc_values"
            );
          });
      });
      it("400: Invalid request - comment_id is not an int", () => {
        return request(app)
          .patch("/api/comments/not-an-int")
          .send({ inc_votes: 3 })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("Invalid input for:not-an-int");
          });
      });
      it("404: Not Found - comment_id is not in the database", () => {
        return request(app)
          .patch("/api/comments/1241")
          .send({ inc_votes: 3 })
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("comment_id:1241 is not in the database");
          });
      });
    });
    it("404: Not Found - comment_id is not in the database", () => {
      return request(app)
        .delete("/api/comments/1234")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal("comment_id:1234 is not in the database");
        });
    });
    it("400: Bad Request - comment_id is not an int", () => {
      return request(app)
        .delete("/api/comments/not-an-int")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal("Invalid input for:not-an-int");
        });
    });
  });
});
