# Node Microservice

Most analytical, interpretive, or persuasive essays tend to follow the same basic pattern. This structure should help you formulate effective outlines for most essays.

---
Micro Services
1. Posts
2. Comments
3. Query Service
4. Event Bus

TO DO
### Comment Moderation
	- Comment Service  
		- On create comment emit event   CreateComment with comment info to Event bus
	- Event Bus 
		- Publish event to all subscriber
	- Moderate Comment Service 
		- Receive CreateComment event
		- Update comment 
		- Emit CommentModerated with updated status to comment to Event bus
	- Event Bus 
		- Publish event to all subscriber
	- Comment Service  
		- Receive CommentModerated event 
		- Update comment with status
		- Emit CommentUpdated to Event bus
	- Event Bus 
			- Publish event to all subscriber
	- Query Service
		- Receive CommentUpdated event
		- Update comment

Key Notes
1. Handling one-to-many relation in microservice
   For example fetch  posts with their all comment
	1. Approach #1 Sync Communication
	   Send all list of post ids to comment service and map comment response to related post and send back to client.
		1. Pros
			1. Easy to understand
		2. Cons
			1. Introduces a dependency between services
			2. if any inter-service request fails, the overall requests fails
			3. The entire request is only as fast as the slowest request
			4. Can easily introduce webs of requests
	2. Approach  #2 - Async Communication through Event Bus
	   Introduce Event Bus and Query Service 
		1. Event Bus
			1. Listen for post and comment creation
			2. Emit event for both
		2. Query Service
			1. Listen for post and comment creation
			2. Keep in required data structure and update
			   

		1. Pros
			1. Query service has zero dependency on other service
			2. Fast to retrieve data
		2. Cons
			1. Data duplication
			2. Hard to understand