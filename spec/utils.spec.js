process.env.NODE_ENV = "test";
const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe("formatDates", () => {
  it("Returns an array with a date correctly formatted", () => {
    let input = [
      {
        title: "Stone Soup",
        topic: "cooking",
        author: "cooljmessy",
        body: "black",
        created_at: 1481662720516
      },
      {
        title: "The vegan carnivore?",
        topic: "cooking",
        author: "tickle122",
        body: "the chef",
        created_at: 1492163783248
      }
    ];
    let output = formatDates(input);
    expect(output).to.be.length(2);

    expect(output[0].created_at instanceof Date).to.be.true;
    expect(output[1].created_at instanceof Date).to.be.true;
  });
  it("shouldnt mutate that original object", () => {
    let input = [
      {
        title: "Stone Soup",
        topic: "cooking",
        author: "cooljmessy",
        body: "black",
        created_at: 1481662720516
      },
      {
        title: "The vegan carnivore?",
        topic: "cooking",
        author: "tickle122",
        body: "the chef",
        created_at: 1492163783248
      }
    ];

    let output = formatDates(input);

    expect(input[0].created_at).to.equal(1481662720516);
  });
});

describe("makeRefObj", () => {
  it("Should return an empty object when passed an empty array", () => {
    expect(makeRefObj([])).to.eql({});
  });
  it("Should return an a reference object an array of objects", () => {
    expect(
      makeRefObj(
        [
          {
            id: 10,
            name: "sam"
          },
          {
            id: 30,
            name: "alex"
          }
        ],
        "id",
        "name"
      )
    ).to.eql({ 10: "sam", 30: "alex" });
  });
});

describe("formatComments", () => {
  it("should return a the formatted comments", () => {
    let input = [
      {
        body: "Oh, I've got comp I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389
      },
      {
        body: "Th are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 14,
        created_at: 1479818163389
      }
    ];

    let refObj = {
      "Living in the shadow of a great man": 1,
      "They're not exactly dogs, are they?": 2
    };

    expect(formatComments(input, refObj)).to.eql([
      {
        body: "Oh, I've got comp I'm the Sultan of Sentiment!",
        votes: 16,
        created_at: new Date(1511354163389),
        author: "butter_bridge",
        article_id: 2
      },
      {
        body: "Th are; not cotton, not rayon, silky.",
        votes: 14,
        created_at: new Date(1479818163389),
        author: "butter_bridge",
        article_id: 1
      }
    ]);
  });
});
