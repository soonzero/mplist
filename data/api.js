const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
const AUTH_ENDPOINT = process.env.NEXT_PUBLIC_AUTH_ENDPOINT;
const RESPONSE_TYPE = process.env.NEXT_PUBLIC_RESPONSE_TYPE;
const SCOPE = process.env.NEXT_PUBLIC_SCOPE;
const AUTH_LINK = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

export default AUTH_LINK;

// 2022.06.21 mplist.netlify.app deploy 하면서 AUTH_LINK 변경
