# Covid-Co

Help people to detect or notify symptoms related to the virus COVID-19

## Getting Started

We are using Vuejs and Firebase for the backend initially

### Prerequisites

You need nodejs and npm installed on your machine

If you want to deploy this please configure a Firebase Application

We are using postgreSql for this project


### Installing

Just clone this code and install de dependencies


``` bash
# install dependencies
npm install

```

configure your db connection - set the config variables 

``` bash

firebase functions:config:set db.host=<your-host>
firebase functions:config:set db.user=<db_user>
firebase functions:config:set db.password=<password>
firebase functions:config:set db.db_name=<your_db_name>


firebase functions:config:set aws.access_key_id=<your_aws_key>
firebase functions:config:set aws.secret_access_key=<your_secret_access_key>
```


## Running the tests

TBD

### Break down into end to end tests

TBD

### And coding style tests

TBD

## Deployment


``` bash
# deploy to firebase
firebase deploy --project <your-project>

```

## Built With
* [Express](https://expressjs.com/) - For APIs
* [Nodejs](https://nodejs.org/en/) - Backend
* [Firebase](https://firebase.google.com/) - Cloud Services

## Contributing

Please read [CONTRIBUTING.md](https://github.com/CovidCo/covidco-web-app/contributing) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/CovidCo/covidco-web-app/tags).

## Authors

* **Jose Cerón** - *Initial work* - [Personal](https://github.com/joseceron)
* **Alejandro Maya** - *Initial work* - [Personal](https://github.com/slorq)
* **Esteban Cerón** - *Initial work* - [Personal](https://github.com/estebance)

See also the list of [contributors](https://github.com/CovidCo/covidco-web-app/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

*  Help some people
