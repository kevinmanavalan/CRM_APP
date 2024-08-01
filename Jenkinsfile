pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git branch: 'crm_dev',
                    url: 'https://github.com/kevinmanavalan/CRM_APP.git'
                echo 'Checkout Stage'
            }
        }
        stage('Build'){
            steps{
                dir('SpringBootBackend'){
                    sh 'mvn clean install'
                }
                echo 'Build Stage'
            }
        }
        stage('Test'){
            sh 'mvn test'
            echo 'Test Stage'
        }
    }

    post{
        success{
            echo 'Pipeline completed successfully'
        }
        failure{
            echo 'Pipeline failed'
        }
    }
}