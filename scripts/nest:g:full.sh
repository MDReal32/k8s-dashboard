#!/bin/bash

fix_path_by_resource() {
  local resource=$1
  local name=$2
  local args=""
  local has_directory=false

  while [[ $# -gt 0 ]]; do
    case "$1" in
      "$resource")
        shift
        ;;
      --directory)
        if [[ $# -gt 1 && $resource == "gateway" ]]; then
          args="$args --directory $2/$name"
          shift
        else
          args="$args --directory $2"
          shift
        fi
        has_directory=true

        shift
        ;;
      *)
        args="$args $1"
        shift
        ;;
    esac
  done

  if [[ $has_directory == false && $resource == "gateway" ]]; then
    args="$args --directory $name"
  fi

  echo "$args"
}

for resource in module controller gateway service ; do
  yarn nx g @nx/nest:"${resource}" --project server $(fix_path_by_resource $resource "$@")
done