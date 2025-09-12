pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/larissabicalho/cypress-base2.git'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Cypress tests') {
            steps {
                sh 'npx cypress run'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'cypress/screenshots/**/*.*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/videos/**/*.*', allowEmptyArchive: true
			archiveArtifacts artifacts: 'cypress/reports/**/*.*', allowEmptyArchive: true
        }
    }
}
