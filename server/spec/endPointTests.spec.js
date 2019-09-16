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
  it("/topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).to.equal(3);
        expect(body[0]).to.contain.keys("slug", "description");
      });
  });
  it("/user/:username", () => {
    return request(app)
      .get("/api/users/butter_bridge")
      .expect(200)
      .then(({ body }) => {
        expect(body).to.equal({
          username: "butter_bridge",
          name: "jonny",
          avatar_url:
            "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg"
        });
      });
  });
  it("/articles/:article_id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        expect(body).to.have.keys(
          "author",
          "title",
          "article_id",
          "body",
          "topic",
          "created_at",
          "votes",
          "comment_count"
        );
      });
  });
  it("/articles/:article_id", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 100 })
      .expect(200)
      .then(({ body }) => {
        expect(body.votes).to.equal(200);
      });
  });
  it("/articles/:article_id/comments", () => {
    return request(app)
      .post("/api/articles/1/commments")
      .send({
        username: "butter_bridge",
        body: "Test Comment"
      })
      .expect(201)
      .then(({ body }) => {
        expect(body).to.have.keys(
          "comment_id",
          "author",
          "article_id",
          "votes",
          "created_at",
          "body"
        );
      });
  });
  it("/articles/:article_id/comments", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body[0]).to.have.keys(
          "comment_id",
          "votes",
          "created_at",
          "author",
          "body"
        );

        expect(body).to.be.sortedBy("created_at");
      });
  });
  it("/articles/:article_id/comments?sort_by=votes", () => {
    return request(app)
      .get("/api/articles/1/comments?sort_by=votes")
      .expect(200)
      .then(({ body }) => {
        expect(body).to.be.sortedBy("votes");
      });
  });
  it("/articles/:article_id/comments?order=desc", () => {
    return request(app)
      .get("/api/articles/1/comments?order=desc")
      .expect(200)
      .then(({ body }) => {
        expect(body).to.be.sortedBy("created_at", { descending: true });
      });
  });
  it("/articles", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body[0]).to.contain.keys(
          "author",
          "title",
          "article_id",
          "topic",
          "created_at",
          "votes",
          "comment_count"
        );
      });
  });
  it("/articles?sort_by=votes&&order=desc", () => {
    return request(app)
      .get("api/articles?sort_by=votes&&order=desc")
      .expect(200)
      .then(({ body }) => {
        expect(body.to.be.sortedBy("votes", { descending: true }));
      });
  });
  it("/articles?author=butter_bridge", () => {
    return request(app)
      .get("api/articles?author=butter_bridge")
      .expect(200)
      .then(({ body }) => {
        expect(body[0].author).to.equal("butter_bridge");
        expect(body[1].author).to.equal("butter_bridge");
      });
  });
  it("/articles?topic=mitch", () => {
    return request(app)
      .get("api/articles?topic=mitch")
      .expect(200)
      .then(({ body }) => {
        expect(body[0].topic).to.equal("mitch");
        expect(body[1].topic).to.equal("mitch");
      });
  });
  it("/comments/:comment_id", () => {
    return request(app)
      .patch("api/comments/1")
      .send({ inc_votes: 1000 })
      .expect(200)
      .then(({ body }) => {
        expect(body.votes).to.be.greaterThan(500);
      });
  });
  it("/comments/:comment_id", () => {
    return request(app)
      .delete("api/comments/1")
      .expect(204);
  });
});
