const inquirer = require("inquirer");
const request = require("request");
const parseString = require("xml2js").parseString;

inquirer
  .prompt([
    {
      type: "list",
      name: "start",
      message: "What would you like to do?",
      choices: ["Get a widget URL", "Get an api token to open a Nexus session"]
    }
  ])
  .then(answers => {
    if (answers.start === "Get a widget URL") {
      getWidgets();
    } else {
      getToken();
    }
  });

  function getWidgets() {
    inquirer
    .prompt([
      {
        type: "list",
        name: "widgets",
        message: "Which widget would you like a URL for?",
        choices: ["master_widget", "mobile_master_widget", "accounts_widget", "budgets_widget", "cash_flow_widget", "connect_widget", "connections_widget", "debts_widget", "goals_widget", "investments_widget", "mini_budgets_widget", "mini_spending_widget", "mobile_accounts_widget", "mobile_budgets_widget", "mobile_spending_widget", "mobile_transactions_widget", "net_worth_widget", "notifications_settings_widget", "pulse_widget", "settings_widget", "spending_widget", "transactions_widget", "trends_widget"]
      },
      {
        type: "list",
        name: "env",
        message: "Choose environment",
        choices: ["Integration", "Production"]
      },
      {
        type: "input",
        name: "MD_API_KEY",
        message: "What is your MD-API-KEY"
      },
      {
        type: "input",
        name: "client_id",
        message: "What is your client_id"
      },

      {
        type: "input",
        name: "user_id",
        message: "What is your user_id"
      }
    ])
    .then(answers => {
        if (answers.env === "Production") {
          envURL = "sso.";
        } else {
          envURL = "int-sso.";
        }
        
        widgetType = answers.widgets;
        client_id = answers.client_id;
        user_id = answers.user_id;
        MD_API_KEY = answers.MD_API_KEY;
       
    let options = {
        method: "GET",
        url: `https://${envURL}moneydesktop.com/${client_id}/users/${user_id}/urls/${widgetType}.xml`,
        headers: {
          "MD-API-KEY": MD_API_KEY,
          Accept: "application/vnd.moneydesktop.sso.v3+json"
        }
      };

      request(options, function(error, response, body) {
        if (error) throw new Error(error);
        parseString(body, function(err, result) {
            console.log(result.url.url[0])
        })

   
      });


        
    });

  }

  function getToken() {
    inquirer
    .prompt([
      {
        type: "list",
        name: "env",
        message: "Choose environment",
        choices: ["Integration", "Production"]
      },
      {
        type: "input",
        name: "MD_API_KEY",
        message: "What is your MD-API-KEY"
      },
      {
        type: "input",
        name: "client_id",
        message: "What is your client_id"
      },

      {
        type: "input",
        name: "user_id",
        message: "What is your user_id"
      }
    ])
    .then(answers => {
      if (answers.env === "Production") {
        envURL = "sso.";
      } else {
        envURL = "int-sso.";
      }

      client_id = answers.client_id;
      user_id = answers.user_id;
      MD_API_KEY = answers.MD_API_KEY;


            let options = {
              method: "GET",
              url: `https://${envURL}moneydesktop.com/${client_id}/users/${user_id}/api_token.xml`,
              headers: {
                "MD-API-KEY": MD_API_KEY,
                Accept: "application/vnd.moneydesktop.sso.v3+json"
              }
            };

            request(options, function(error, response, body) {
                if (error) throw new Error(error);
                parseString(body, function(err, result) {
                    console.log("API Token:   " + result.api_token.token[0]);
                })
        
           
              });
        
        
                
            });
        
          }