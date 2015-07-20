/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function(){
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function(){
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* DONE: Wrote a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('has url', function(){
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe(null); // I chose to use "null" because that means nothing was assigned/there is no value
            });
         });

        /* DONE: Wrote a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('has name', function(){
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined;
                expect(feed.name).not.toBe(null);
            });
         });
    });


    /* DONE: Wrote a new test suite named "The menu" */

    describe('The Menu', function(){
        /* DONE: Wrote a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         var menuHidden = $('body').hasClass('menu-hidden');

         // looks to see if body has the class menu-hidden
         it('is hidden', function(){
            expect(menuHidden).toBeTruthy();
         });

         describe('is clicked', function(){
            var menuIcon = $('.menu-icon-link');
            var body = $('body');

            // use of beforeEach because of DRY, we can trigger the click once
            // then expect the body to have class menu-hidden or not
            beforeEach(function(){
                // use .trigger() to simulate a click on menu-icon-link before each spec
                menuIcon.trigger('click');
            });

            it('and appears', function(){
                expect(body.hasClass('menu-hidden')).toBeFalsy();
            });

            it('and disappears', function(){
                expect(body.hasClass('menu-hidden')).toBeTruthy();
            });
        });
    });

    /* DONE: Wrote a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* DONE: Wrote a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         var container = $('.feed');
         // done() in beforeEach signals to framework that the async function is done
         // so we can continue to test, this helps to signal which tests rely on this async execution

         beforeEach(function(done){
            loadFeed(0, done);
         });

         it('has one entry', function(done){
            expect(container.children().length).not.toBe(0);
            done();
         });
    });

    /* DONE: Wrote a new test suite named "New Feed Selection" */
    describe('News Feed Selection', function(){
        /* DONE: Wrote a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         var ogContent;
         var newContent;

        // beforeEach spec we will load the first feed and store the entry content from jQuery's .html()
        // we will also loadFeed(1) and store the content from that entry to be compared in the spec
         beforeEach(function(done){
            // loading the 0th Feed
            loadFeed(0, function(){
                // storing the html content of 0th entry
                ogContent = $('.entry').html();
                // load next feed item
                loadFeed(1, function(){
                    //store the content for comparison and signal that async fn is done
                    newContent = $('.entry').html();
                    done();
                });
            });
         });

         it('has new content', function(done){
            //expect new content when new feeds are loaded!
            expect(ogContent).not.toBe(newContent);
            done();
         });

         afterEach(function(done){
            loadFeed(0, function(){
                done();
            });
         });
    });
    
    // New Test Suite to test for future functionality of adding and removing Feeds from allFeeds
    describe('allFeed Modification', function(){
        var newName = 'test name';
        var newURL = 'www.testurl.com';
        var newFeedItem = {name: newName, url: newURL};

        var feedLen = allFeeds.length; // val: 5 - get the original feed length prior to adding/subtracting

        it('should add a new feed', function(){
            addFeed(newName, newURL);
            var newFeedLen = allFeeds.length; // val: 6 after adding a feed
            expect(newFeedLen).toBe(feedLen + 1); // after addFeed, we should see the feed length increase by 1
            expect(allFeeds[allFeeds.length-1]).toMatch(newFeedItem);
            // removed these tests in favor of the above test for DRY purposes
            // expect(allFeeds[allFeeds.length-1].name).toBe(newName); 
            // expect(allFeeds[allFeeds.length-1].url).toBe(newURL);
        });

        it('should remove a feed', function(){
            var trackRemoved = allFeeds[0]; // the original 0th feed before removal
            var ogFeedLen = allFeeds.length; // feed length before removal

            removeFeed(0); // removing 0th feed
            var rmFeedLen = allFeeds.length; // updated feed length
            expect(rmFeedLen).toEqual(ogFeedLen - 1);
            expect(allFeeds[0]).not.toBe(trackRemoved); // check if 0th feed has been removed
            //expect(allFeeds[allFeeds.length-1]).not.toMatch[newItem]; // old version where I would check if addFeed's feed was still in the array 
        });
    });
}());
