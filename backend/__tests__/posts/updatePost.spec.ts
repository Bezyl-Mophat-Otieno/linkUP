import DB from "../../src/database/dbHelper.ts";
import { Request, Response } from "express";
import updatePost from "../../src/controllers/posts/updatePost.ts";

jest.mock("../../src/database/dbHelper.ts");
describe("Update Post", () => {
  it("it should error out if the post id is not provided", async () => {
    const mockedReq = {
      params: {},
    } as unknown as Request;
    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await updatePost(mockedReq, mockedRes);
  });

  it("it should error out if a post content or image is not provided during an update", async () => {
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

    await updatePost(mockedReq, mockedRes);
  });

  it("it should error out if the post is not found", async () => {
    const mockedReq = {
      params: {
        id: "test_id",
      },
      body: {
        content: "mocked content",
        image: "img-url",
      },
    } as unknown as Request;
    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      rowsAffected: [0],
    });
    await updatePost(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(400);
  });
  it("it should show return a success message if the post is updated successfully", async () => {
    const mockedReq = {
      params: {
        id: "test_id",
      },
      body: {
        content: "mocked content",
        image: "img-url",
      },
    } as unknown as Request;
    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      rowsAffected: [1],
    });
    await updatePost(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(200);
  });
});
