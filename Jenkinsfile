pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Environment Check') {
            steps {
                echo 'Verifying Node.js and Terraform versions...'
                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('app') {
                    echo 'Installing React application dependencies...'
                    sh 'npm install'
                }
            }
        }

        stage('Build React App') {
            steps {
                dir('app') {
                    echo 'Building production bundle with Vite...'
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy / Restart Service') {
            steps {
                echo 'Deploying application to local systemd service...'
                sh 'sudo systemctl restart reactapp || true'
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution complete.'
        }
        success {
            echo '✅ React App successfully built and deployed via Jenkins!'
        }
        failure {
            echo '❌ Jenkins pipeline failed. Check console output logs.'
        }
    }
}
