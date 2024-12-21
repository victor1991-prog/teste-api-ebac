pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                git branch: 'Pipeline', url: 'https://github.com/victor1991-prog/teste-api-ebac.git'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'NO_COLOR=1 npm test'
            }
        }
    }
}