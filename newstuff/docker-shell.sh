#!/usr/bin/env bash

TEST_MODE=test
DOCKERTEST_MODE=dockertest
RUN_MODE=run
MODE=$RUNMODE
SLEEP_DURATION=5

#parse argument list
while [[ $# > 0 ]]
do
	ARG=$1

	case $ARG in
	-r|--run) MODE=$RUN_MODE ;;
	-t|--test) MODE=$TEST_MODE ;;
	-d|--dockertest) MODE=$DOCKERTEST_MODE ;;
	esac

	shift
done

#prepare nvm
cd /opt/app/current
source /root/.nvm/nvm.sh

#echo out environment variables we care about
echo APPLICATION_VARIABLES
echo NODE_ENV=$NODE_ENV

#execution based on argument
if [ $MODE == $RUN_MODE ]; then
	echo RUNNING API
	node index.js
elif [ $MODE == $TEST_MODE ]; then
	echo RUNINNG TEST
	npm test
elif [ $MODE == $DOCKERTEST_MODE ]; then
	echo RUNNING DOCKER TEST
	sleep $SLEEP_DURATION
	echo SLEEPING FOR $SLEEP_DURATION
	npm run dockertest
fi
