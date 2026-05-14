export const authState = {
  users: new Map<string, any>(),
  tokens: new Map<string, string>()
};

export function createToken(email:string){
  return "token_" + email;
}

export function getUserFromToken(token:string){
  const email = authState.tokens.get(token);
  return email ? authState.users.get(email) : null;
}
