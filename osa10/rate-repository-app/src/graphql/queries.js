import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Query(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $after: String
    $first: Int
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      after: $after
      first: $first
    ) {
      edges {
        node {
          id
          description
          fullName
          language
          ownerAvatarUrl
          stargazersCount
          ratingAverage
          forksCount
          reviewCount
          createdAt
        }
      }
      pageInfo {
        hasNextPage
        endCursor
        startCursor
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query Query($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      id
      fullName
      ownerAvatarUrl
      description
      forksCount
      language
      ratingAverage
      reviewCount
      stargazersCount
      url
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            rating
            text
            user {
              username
            }
            createdAt
          }
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
      ownerName
    }
  }
`;

export const ME = gql`
  query Query($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            text
            id
            createdAt
            rating
            user {
              username
            }
            repositoryId
            repository {
              fullName
            }
          }
        }
      }
    }
  }
`;

// other queries...
