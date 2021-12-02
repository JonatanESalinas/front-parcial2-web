import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';

const TOKENAUTH = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

const CREATEUSER = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      user { 
        id
        username
        email
      }
    }
  }
  `;

const QUERYIMAGES = gql`
  query {
    images{
      id
      description
      url
    }
  }
`;

const CREATEVOTE = gql`
  mutation CreateVote($linkId: Int!) {
    createVote(linkId: $linkId) {
      user { 
        id
        username
        email
      }
      link{
        id
        description
        url
      }
    }
  }
  `;

  const QUERYEQUIPOFAV = gql`
  query {
    votes{
      user{
        username
      }
      link{
        description
      }
    }
  }
  `;

@Injectable({
  providedIn: 'root'
})

export class GraphqlUsersService {
  constructor(private apollo: Apollo) {}

  tokenAuth(username: string, password: string) {
 
    return this.apollo.mutate({
      mutation: TOKENAUTH,
      variables: {
        username: username,
        password: password
      }
    });
  
    }

    queryImages(){
      return this.apollo.query({
        query: QUERYIMAGES,
      });
  
    } 
  createUser(username: string, email: string, password: string) {
 
      return this.apollo.mutate({
        mutation: CREATEUSER,
        variables: {
          username: username,
          email: email,
          password: password
        }
      });
    
  }

  createVote(linkId: Int16Array, untoken: string) {
 
    return this.apollo.mutate({
      mutation: CREATEVOTE,
      context: { 
        headers: { 
          Authorization: untoken 
        } 
      },
      variables: {
        linkId: linkId
      }
    });
}

queryEquipoFav() {
 
  return this.apollo.query({
    query: QUERYEQUIPOFAV,
  });
}
   
}