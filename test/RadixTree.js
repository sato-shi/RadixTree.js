module("basic");

test("testSimpleInsert", function() {
  tree = new RadixTree();
  tree.insert("apple", "apple");
  equal("apple", tree.find("apple"));
});
test("testInsertNoOverlap", function() {
  tree = new RadixTree();
  tree.insert("apple", "apple");
  tree.insert("ball", "ball");
  equal("apple", tree.find("apple"));
  equal("ball", tree.find("ball"));
});
test("testInsertWithOverlap", function() {
  tree = new RadixTree();
  tree.insert("apple", "apple");
  tree.insert("apricot", "apricot");
  equal("apple", tree.find("apple"));
  equal("apricot", tree.find("apricot"));
});
test("testDuplication", function() {
  tree = new RadixTree();
  tree.insert("apple", "apple");
  try {
    tree.insert("apple", "apple");
    fail();
  } catch (e) {
    equal("Duplicate key", e);
  }
});
test("testCreatesUnrealNode", function() {
  tree = new RadixTree();
  tree.insert("apple", "apple");
  tree.insert("ape", "ape");
  equal(2, tree.getNumberOfRealNodes());
  equal(4, tree.getNumberOfNodes());
  equal("undefined", typeof tree.find("ap"));
});
test("testConvertUnrealNodeToRealNode", function() {
  tree = new RadixTree();
  tree.insert("apple", "apple");
  tree.insert("ape", "ape");
  tree.insert("ap", "ap");
  equal(3, tree.getNumberOfRealNodes());
  equal("ap", tree.find("ap"));
});
test("testStoringWithRightNumberOfNodes", function() {
  tree = new RadixTree();
  tree.insert("apple", "apple");
  tree.insert("ape", "ape");
  tree.insert("applepie", "applepie");
  tree.insert("applecrisp", "applecrisp");
  tree.insert("argument", "argument");
  tree.insert("ball", "ball");
  tree.insert("ballroom", "ballroom");
  tree.insert("balance", "balance");
  tree.insert("balancing", "balancing");
  tree.insert("cat", "cat");
  
  // root node
  // a
  // a-p
  // a-p-e (+)
  // a-p-ple (+)
  // a-p-ple-crisp (+)
  // a-p-ple-pie (+)
  // a-rgument (+)
// bal
// bal-l (+)
// bal-l-room (+)
// bal-anc
// bal-anc-e (+)
// bal-anc-ing (+)
  // cat (+)
  equal(15, tree.getNumberOfNodes());
  equal(10, tree.getNumberOfRealNodes());
});
test("testSearchLimitGreaterThanResults", function() {
  tree = new RadixTree();
  tree.insert("apple", "apple");
  tree.insert("applepie", "applepie");
  tree.insert("applecrisp", "applecrisp");
  tree.insert("application", "application");
  tree.insert("appendix", "appendix");
  tree.insert("apecrap", "apecrap");
  tree.insert("ball", "ball");
  
  result = tree.search("app", 10);
  
  equal(5, result.length);
  
  ok(result.contains("apple"));
  ok(result.contains("applepie"));
  ok(result.contains("applecrisp"));
  ok(result.contains("application"));
  ok(result.contains("appendix"));
  
});
test("testSearchLimitLessThanResults", function() {
  tree = new RadixTree();
  tree.insert("apple", "apple");
  tree.insert("applepie", "applepie");
  tree.insert("applecrisp", "applecrisp");
  tree.insert("application", "application");
  tree.insert("appendix", "appendix");
  tree.insert("apecrap", "apecrap");
  tree.insert("ball", "ball");
  
  result = tree.search("app", 3);
  
  equal(3, result.length);
  
  ok(result.contains("apple"));
  ok(result.contains("applepie"));
  ok(result.contains("applecrisp"));
});
//    test("testSearchWithWildcard", function() {
//    	tree = new RadixTree();
//    	tree.insert("apple", "apple");
//    	tree.insert("applepie", "applepie");
//    	tree.insert("applecrisp", "applecrisp");
//    	tree.insert("application", "application");
//    	tree.insert("appendix", "appendix");
//    	tree.insert("apecrap", "apecrap");
//    	tree.insert("ball", "ball");
//    	result = tree.search("ap*e", 10);
//    	equal(5, result.length);
//    	ok(result.contains("apple"));
//    	ok(result.contains("applepie"));
//    	ok(result.contains("applecrisp"));
//   	ok(result.contains("appendix"));
//    	ok(result.contains("apecrap"));
//    }
