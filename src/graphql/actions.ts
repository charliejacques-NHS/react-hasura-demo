import { gql } from 'urql';

interface GET_USER_DETAILS {
  get_user_details: {
    group_id: string;
    group_name: string;
    user_id: string;
  };
}

interface GET_USER_DETAILS_VARIABLES {
  username: string;
}

export const GET_USER_DETAILS = gql<
  GET_USER_DETAILS,
  GET_USER_DETAILS_VARIABLES
>`
  query GET_USER_DETAILS($username: String!) {
    get_user_details(args: { username: $username }) {
      group_id
      group_name
      user_id
    }
  }
`;
