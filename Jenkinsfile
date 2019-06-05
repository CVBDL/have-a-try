pipeline {
  agent any
  stages {
    stage('Git scripts') {
      steps {
        git(url: 'https://github.com/CVBDL/have-a-try.git', branch: 'master', poll: true)
      }
    }
    stage('Say Hello') {
      steps {
        sh 'echo "hello world"'
      }
    }
    stage('Sleep') {
      steps {
        sleep 10
      }
    }
    stage('Send Mail') {
      steps {
        mail(subject: 'Test report', body: 'This is a test report', to: 'awang14@ra.rockwell.com')
      }
    }
  }
  environment {
    bld_num = '111'
  }
}