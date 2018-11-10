# court-crawler
Background Cloud Function to periodically check the availability of tennis courts. Triggered by Google Cloud Scheduler & Pub/Sub.

## Project settings
```
# setup project
gcloud components install beta
gcloud components update
gcloud config set project court-crawler

# create pub/sub topic
gcloud beta pubsub topics create court-crawler

# create cloud scheduler
gcloud beta scheduler jobs create pubsub court-crawler --schedule "every 24 hours" --topic court-crawler --message-body="Run crawler"

# deploy cloud function
cd functions/
gcloud beta functions deploy courtCrawler --trigger-resource court-crawler --trigger-event google.pubsub.topic.publish --memory 1024MB --runtime nodejs8 --env-vars-file .env.yaml --region asia-northeast1
```

## References
* https://cloud.google.com/functions/docs/tutorials/pubsub?hl=ja
* https://cloud.google.com/functions/docs/calling/pubsub?hl=ja
* https://github.com/GoogleCloudPlatform/nodejs-docs-samples/tree/master/functions/pubsub
* https://cloud.google.com/blog/products/gcp/introducing-headless-chrome-support-in-cloud-functions-and-app-engine
* https://cloud.google.com/scheduler/docs/configuring/cron-job-schedules
* https://cloud.google.com/appengine/docs/flexible/nodejs/scheduling-jobs-with-cron-yaml

