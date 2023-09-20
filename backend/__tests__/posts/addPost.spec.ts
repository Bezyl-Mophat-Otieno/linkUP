import addPost from "../../src/controllers/posts/addPost.ts";
import DB from "../../src/database/dbHelper.ts";
import { Response, Request } from "express";

jest.mock("../../src/database/dbHelper.ts");
describe("Add Post", () => {
  it("should return an error if the user id is not provided", async () => {
    const mockedReq = {
      params: {},
      body: {
        content: "mocked Content",
        image: "mocked img",
      },
    } as unknown as Request;
    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await addPost(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(400);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "User id is required",
    });
  });
  it("it should error out if both the image or body of the post is not provided", async () => {
    const mockedReq = {
      params: {
        id: "test_id",
      },
      body: {},
    } as unknown as Request;
    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await addPost(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(400);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message:
        "Either the image field , video field or the content field must be filled",
    });
  });

  it("it should error out if no post was made successfully", async () => {
    const mockedReq = {
      params: {
        id: "test_id",
      },
      body: {
        content: "mocked Content",
      },
    } as unknown as Request;
    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      rowsAffected: [0],
    });
    await addPost(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(400);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "Post not added successfully",
    });
  });
  it("it should create post successfully when everything goes well", async () => {
    const mockedReq = {
      params: {
        id: "test_id",
      },
      body: {
        content: "mocked Content",
      },
    } as unknown as Request;
    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      rowsAffected: [1],
    });
    await addPost(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(200);
  });
});
