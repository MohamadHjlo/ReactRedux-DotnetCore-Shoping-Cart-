import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import "./custom.css";
import UsersIndex from "./pages/Users/Index";
import PostsIndex from "./pages/Posts/Index";
import ShowUser from "./pages/Users/ShowUser";
import ShowPost from "./pages/Posts/ShowPost";
import CreatenewUser from "./pages/Users/Create";
import CreatenewPost from "./pages/Posts/Create";
import EditPost from "./pages/Posts/Edit";
import TodosIndex from "./pages/Todo/Index";

import TodoProvider from "./context/TodoProvider";
import PostProvider from "./context/PostProvider";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/users" element={<UsersIndex />} />
        <Route path="/users/showuser/:userId" element={<ShowUser />} />
        <Route path="/users/createnewuser" element={<CreatenewUser />} />
        <Route path="/users/edit/:userId" element={<CreatenewPost />} />
        <Route path="/users/delete/:userId" element={<EditPost />} />

        <Route
          path="/posts"
          element={
            <PostProvider>
              <PostsIndex />
            </PostProvider>
          }
        ></Route>

        <Route
          path="/posts/showpost/:postId"
          element={
            <PostProvider>
              <ShowPost />
            </PostProvider>
          }
        />
        <Route
          path="/posts/createnewpost"
          element={
            <PostProvider>
              <CreatenewPost />
            </PostProvider>
          }
        />
        <Route
          path="/posts/edit/:postId"
          element={
            <PostProvider>
              <EditPost />
            </PostProvider>
          }
        />

        <Route
          path="/todos"
          element={
            <TodoProvider>
              <TodosIndex />
            </TodoProvider>
          }
        ></Route>

        <Route path="/" element={<Home />} />
      </Routes>
    </Layout>
  );
}
export default App;
