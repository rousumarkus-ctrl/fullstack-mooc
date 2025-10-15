import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Query {
    repositories {
      edges {
        node {
          id
          ownerAvatarUrl
          language
          fullName
          description
          forksCount
          ratingAverage
          reviewCount
          stargazersCount
        }
      }
    }
  }
`;

export const ME = gql`
  {
    me {
      id
      username
    }
  }
`;

// other queries...
