import JiraClient from "jira-connector";

let jira = {};

export const initJira = ({ domain, email, token }) => {
  jira = new JiraClient({
    host: domain,
    strictSSL: false,
    basic_auth: {
      email,
      api_token: token,
    },
  });
};

export const formatDate = (d) => {
  const dt = new Date(d);
  return `${dt.toLocaleDateString()} ${dt.toLocaleTimeString()}`;
};

export const groupIssues = (issues) => {
  const issueMap = {};
  issues.forEach((issue) => {
    let { assignee } = issue.fields;
    if (assignee) {
      assignee = assignee.displayName;
      if (!issueMap.hasOwnProperty(assignee)) {
        issueMap[assignee] = [];
      }
      issueMap[assignee].push(issue);
    }
  });
  return issueMap;
};

export const getJira = () => jira;

export const getColorForAge = (days) => {
  if (days > 14) {
    return "red";
  } else if (days > 7) {
    return "orange";
  } else {
    return "green";
  }
};

export const sortRandom = (arr) => {
  return arr.sort(function (a, b) {
    return 0.5 - Math.random();
  });
};

export const getDaysOld = (oldDate) => {
  const date1 = new Date(oldDate);
  const date2 = new Date();
  // To calculate the time difference of two dates
  var Difference_In_Time = date2.getTime() - date1.getTime();

  // To calculate the no. of days between two dates
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  return parseInt(Difference_In_Days);
};

export const sampleIssues = () => {
  return [
    {
      expand:
        "operations,versionedRepresentations,editmeta,changelog,renderedFields",
      id: "10001",
      self: "https://chrisdevelop.atlassian.net/rest/agile/1.0/issue/10001",
      key: "GROW-1",
      fields: {
        assignee: {
          self:
            "https://chrisdevelop.atlassian.net/rest/api/2/user?accountId=5e2b2950832d730ca201a60a",
          accountId: "5e2b2950832d730ca201a60a",
          emailAddress: "chris@stavvy.com",
          avatarUrls: {
            "48x48":
              "https://secure.gravatar.com/avatar/b08aa41d7c245ed0ad74989ee1dda38a?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FCB-3.png",
            "24x24":
              "https://secure.gravatar.com/avatar/b08aa41d7c245ed0ad74989ee1dda38a?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FCB-3.png",
            "16x16":
              "https://secure.gravatar.com/avatar/b08aa41d7c245ed0ad74989ee1dda38a?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FCB-3.png",
            "32x32":
              "https://secure.gravatar.com/avatar/b08aa41d7c245ed0ad74989ee1dda38a?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FCB-3.png",
          },
          displayName: "Chris Buonocore",
          active: true,
          timeZone: "America/New_York",
          accountType: "atlassian",
        },
        status: {
          self: "https://chrisdevelop.atlassian.net/rest/api/2/status/10000",
          description: "",
          iconUrl:
            "https://chrisdevelop.atlassian.net/images/icons/status_generic.gif",
          name: "To Do",
          id: "10000",
          statusCategory: {
            self:
              "https://chrisdevelop.atlassian.net/rest/api/2/statuscategory/2",
            id: 2,
            key: "new",
            colorName: "blue-gray",
            name: "To Do",
          },
        },
        summary: "Update Oauth to 2.0 spec",
        created: "2020-07-04T21:34:23.675-0400",
      },
    },
    {
      expand:
        "operations,versionedRepresentations,editmeta,changelog,renderedFields",
      id: "10002",
      self: "https://chrisdevelop.atlassian.net/rest/agile/1.0/issue/10002",
      key: "GROW-2",
      fields: {
        assignee: {
          self:
            "https://chrisdevelop.atlassian.net/rest/api/2/user?accountId=5f013cbfe407a4001ce38b3f",
          accountId: "5f013cbfe407a4001ce38b3f",
          avatarUrls: {
            "48x48":
              "https://secure.gravatar.com/avatar/a70f326f8f83731b946fa60f24b60797?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FB-3.png",
            "24x24":
              "https://secure.gravatar.com/avatar/a70f326f8f83731b946fa60f24b60797?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FB-3.png",
            "16x16":
              "https://secure.gravatar.com/avatar/a70f326f8f83731b946fa60f24b60797?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FB-3.png",
            "32x32":
              "https://secure.gravatar.com/avatar/a70f326f8f83731b946fa60f24b60797?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FB-3.png",
          },
          displayName: "blackshoalgroup",
          active: true,
          timeZone: "America/New_York",
          accountType: "atlassian",
        },
        status: {
          self: "https://chrisdevelop.atlassian.net/rest/api/2/status/10000",
          description: "",
          iconUrl:
            "https://chrisdevelop.atlassian.net/images/icons/status_generic.gif",
          name: "To Do",
          id: "10000",
          statusCategory: {
            self:
              "https://chrisdevelop.atlassian.net/rest/api/2/statuscategory/2",
            id: 2,
            key: "new",
            colorName: "blue-gray",
            name: "To Do",
          },
        },
        summary: "Implement Feedback collector",
        created: "2020-07-04T22:35:04.725-0400",
      },
    },
    {
      expand:
        "operations,versionedRepresentations,editmeta,changelog,renderedFields",
      id: "10003",
      self: "https://chrisdevelop.atlassian.net/rest/agile/1.0/issue/10003",
      key: "GROW-3",
      fields: {
        assignee: {
          self:
            "https://chrisdevelop.atlassian.net/rest/api/2/user?accountId=5f013d5f9d9a120029ed517a",
          accountId: "5f013d5f9d9a120029ed517a",
          avatarUrls: {
            "48x48":
              "https://secure.gravatar.com/avatar/8e986f5deb20d0f48698bcfbadefa40f?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FJ-2.png",
            "24x24":
              "https://secure.gravatar.com/avatar/8e986f5deb20d0f48698bcfbadefa40f?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FJ-2.png",
            "16x16":
              "https://secure.gravatar.com/avatar/8e986f5deb20d0f48698bcfbadefa40f?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FJ-2.png",
            "32x32":
              "https://secure.gravatar.com/avatar/8e986f5deb20d0f48698bcfbadefa40f?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FJ-2.png",
          },
          displayName: "johng",
          active: true,
          timeZone: "America/New_York",
          accountType: "atlassian",
        },
        status: {
          self: "https://chrisdevelop.atlassian.net/rest/api/2/status/10000",
          description: "",
          iconUrl:
            "https://chrisdevelop.atlassian.net/images/icons/status_generic.gif",
          name: "To Do",
          id: "10000",
          statusCategory: {
            self:
              "https://chrisdevelop.atlassian.net/rest/api/2/statuscategory/2",
            id: 2,
            key: "new",
            colorName: "blue-gray",
            name: "To Do",
          },
        },
        summary: "Add link to app usage",
        created: "2020-07-04T22:35:12.473-0400",
      },
    },
    {
      expand:
        "operations,versionedRepresentations,editmeta,changelog,renderedFields",
      id: "10004",
      self: "https://chrisdevelop.atlassian.net/rest/agile/1.0/issue/10004",
      key: "GROW-4",
      fields: {
        assignee: {
          self:
            "https://chrisdevelop.atlassian.net/rest/api/2/user?accountId=5f013cbfe407a4001ce38b3f",
          accountId: "5f013cbfe407a4001ce38b3f",
          avatarUrls: {
            "48x48":
              "https://secure.gravatar.com/avatar/a70f326f8f83731b946fa60f24b60797?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FB-3.png",
            "24x24":
              "https://secure.gravatar.com/avatar/a70f326f8f83731b946fa60f24b60797?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FB-3.png",
            "16x16":
              "https://secure.gravatar.com/avatar/a70f326f8f83731b946fa60f24b60797?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FB-3.png",
            "32x32":
              "https://secure.gravatar.com/avatar/a70f326f8f83731b946fa60f24b60797?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FB-3.png",
          },
          displayName: "blackshoalgroup",
          active: true,
          timeZone: "America/New_York",
          accountType: "atlassian",
        },
        status: {
          self: "https://chrisdevelop.atlassian.net/rest/api/2/status/10000",
          description: "",
          iconUrl:
            "https://chrisdevelop.atlassian.net/images/icons/status_generic.gif",
          name: "To Do",
          id: "10000",
          statusCategory: {
            self:
              "https://chrisdevelop.atlassian.net/rest/api/2/statuscategory/2",
            id: 2,
            key: "new",
            colorName: "blue-gray",
            name: "To Do",
          },
        },
        summary: "Fix rendering issue of user profile",
        created: "2020-07-04T22:35:39.082-0400",
      },
    },
    {
      expand:
        "operations,versionedRepresentations,editmeta,changelog,renderedFields",
      id: "10005",
      self: "https://chrisdevelop.atlassian.net/rest/agile/1.0/issue/10005",
      key: "GROW-5",
      fields: {
        assignee: {
          self:
            "https://chrisdevelop.atlassian.net/rest/api/2/user?accountId=5e2b2950832d730ca201a60a",
          accountId: "5e2b2950832d730ca201a60a",
          emailAddress: "chris@stavvy.com",
          avatarUrls: {
            "48x48":
              "https://secure.gravatar.com/avatar/b08aa41d7c245ed0ad74989ee1dda38a?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FCB-3.png",
            "24x24":
              "https://secure.gravatar.com/avatar/b08aa41d7c245ed0ad74989ee1dda38a?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FCB-3.png",
            "16x16":
              "https://secure.gravatar.com/avatar/b08aa41d7c245ed0ad74989ee1dda38a?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FCB-3.png",
            "32x32":
              "https://secure.gravatar.com/avatar/b08aa41d7c245ed0ad74989ee1dda38a?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FCB-3.png",
          },
          displayName: "Chris Buonocore",
          active: true,
          timeZone: "America/New_York",
          accountType: "atlassian",
        },
        status: {
          self: "https://chrisdevelop.atlassian.net/rest/api/2/status/10000",
          description: "",
          iconUrl:
            "https://chrisdevelop.atlassian.net/images/icons/status_generic.gif",
          name: "To Do",
          id: "10000",
          statusCategory: {
            self:
              "https://chrisdevelop.atlassian.net/rest/api/2/statuscategory/2",
            id: 2,
            key: "new",
            colorName: "blue-gray",
            name: "To Do",
          },
        },
        summary: "Add SSL Certificate",
        created: "2020-07-04T22:41:46.621-0400",
      },
    },
    {
      expand:
        "operations,versionedRepresentations,editmeta,changelog,renderedFields",
      id: "10006",
      self: "https://chrisdevelop.atlassian.net/rest/agile/1.0/issue/10006",
      key: "GROW-6",
      fields: {
        assignee: null,
        status: {
          self: "https://chrisdevelop.atlassian.net/rest/api/2/status/10000",
          description: "",
          iconUrl:
            "https://chrisdevelop.atlassian.net/images/icons/status_generic.gif",
          name: "To Do",
          id: "10000",
          statusCategory: {
            self:
              "https://chrisdevelop.atlassian.net/rest/api/2/statuscategory/2",
            id: 2,
            key: "new",
            colorName: "blue-gray",
            name: "To Do",
          },
        },
        summary: "Fix cors issue with login",
        created: "2020-07-04T22:42:04.836-0400",
      },
    },
  ];
};
