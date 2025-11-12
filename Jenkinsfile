pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'sonlovecode'
        IMAGE_BACKEND = 'cafeapp-backend'
        IMAGE_FRONTEND = 'cafeapp-frontend'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: 'github-pat',
                    url: 'https://github.com/Sonlovecode/CafeApp.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh 'docker build -t $DOCKER_HUB_USER/$IMAGE_BACKEND:latest ./cafeapp'
                    sh 'docker build -t $DOCKER_HUB_USER/$IMAGE_FRONTEND:latest ./cafeapp-frontend'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-cred',
                    usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker push $DOCKER_USER/$IMAGE_BACKEND:latest
                        docker push $DOCKER_USER/$IMAGE_FRONTEND:latest
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Bạn có thể thêm SSH deploy ở đây nếu có server production'
            }
        }
    }
}
