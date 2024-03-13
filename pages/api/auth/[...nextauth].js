import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";



export default NextAuth({
  
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // CredentialsProvider({
    //   name: 'Credentials',
    //   credentials: {
    //     username: { label: "Username", type: "text", placeholder: "jsmith" },
    //     password: { label: "Password", type: "password" }
    //   },
    //   authorize: async (credentials) => {
    //     const user = { id: 1, name: 'nenewang', email: 'wangnelson2@gmail.com' }
    //     if (credentials.email === user.email) {
    //       return Promise.resolve(user);
    //     } else {
    //       return Promise.resolve(null);
    //     }
    //   },
    // }),
    // ...add more providers here
  ],
  // Add other NextAuth.js configuration options here
});
