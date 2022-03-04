import Layout from "../components/layout";

export default function About() {
  return (
    <Layout>
      <div className="max-w-600 mx-auto">
      <h1>About</h1>
      <p>This site is currently a proof of concept in a beta stage.</p>
      <p>
        The purpose of this site is to build an online IDE where more than one
        user can collaborate within a file or code base.
      </p>
      <p>
        If you come across any bugs, report an <a href="">issue</a>.
      </p>
      <hr/>
      <h2>Contribution</h2>
      <p>
        Feel free to contribute to <a href="">this project</a>.
      </p>
      <hr />
      <p>
        Thank you for coming to this app! All feedback welcome, just keep in
        mind, that this app has known bugs and update features that will be
        resolved and improved upon in due time.
      </p>
      <p>Happy Hacking!</p>
      </div>
    </Layout>
  );
}
