#!/bin/sh
main() {
    username=$1
    repo=$2
    branch=$3

    docker build -t "$username/$repo:$branch" .
    docker push "$username/$repo:$branch"
}

main "$@"