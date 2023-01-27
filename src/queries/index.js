import { gql } from "@apollo/client";

export const ALL_POSTS = gql`
query {
  posts {
    __typename
    id
    title
    content
    picture
    createdAt
  }
}
`;

export const SINGLE_POST = gql`
query ($id: Int!) {
  post(id: $id) {
    __typename
    id
    title
    content
    picture
    createdAt
  }
}
`;


export const DELETE_POST = gql`
mutation ($id: Int!) {
  removePost(id: $id) {
    __typename
    id
    title
    content
    picture
  }
}
`;

export const CREATE_POST_MUTATION = gql`
  mutation ($createPostInput: CreatePostInput!) {
    createPost(createPostInput: $createPostInput) {
      __typename
      id
      title
      picture
      content
    }
  }
`;
