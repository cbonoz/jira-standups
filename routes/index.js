export default function routes(app, addon) {
  // Redirect root path to /atlassian-connect.json,
  // which will be served by atlassian-connect-express.
  app.get("/", (req, res) => {
    res.redirect("/atlassian-connect.json");
  });

  // This is an example route used by "generalPages" module (see atlassian-connect.json).
  // Verify that the incoming request is authenticated with Atlassian Connect.
  app.get("/hello-world", addon.authenticate(), (req, res) => {
    // Rendering a template is easy; the render method takes two params:
    // name of template and a json object to pass the context in.
    res.render("hello-world", {
      title: "Jira Standups",
      description:
        "The chrome extension that helps you run more effective standups, right from Jira.",
      github: "https://github.com/cbonoz/jira-standups",
      //issueId: req.query['issueId']
    });
  });

  app.get("/boards", addon.authenticate(), (req, res) => {
    const http = addon.httpClient(req);
    const url = "/rest/agile/1.0/board";

    http.get(
      {
        url,
        contentType: "application/json",
        json: true,
      },
      (error, result, data) => {
        console.log("data", data);
        return res.json(data);
      }
    );
  });

  // Add additional route handlers here...
}
