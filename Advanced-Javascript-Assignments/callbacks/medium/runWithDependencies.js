// Problem Description – Task Execution with Dependencies

// You are given a set of asynchronous tasks where some tasks depend on the completion of others. 
// Your goal is to execute each task only after all of its dependencies have been successfully fulfilled. 
// The solution should ensure correct execution order and handle dependency relationships properly

    /**DONE */

function runWithDependencies(tasks, finalCallback) {
    const taskMap = Object.fromEntries(tasks.map(t => [t.id, t]));
    const results = {};

    function runTask(taskId, done) {
        if (results[taskId]) return done(null, results[taskId]);

        const task = taskMap[taskId];
        if (!task) return done(new Error("Task not found: " + taskId));

        runDeps(task.deps, (err) => {
            if (err) return done(err);

            task.run((err, res) => {
                if (err) return done(err);
                results[taskId] = res;
                done(null, res);
            });
        });
    }

    function runDeps(depList, done) {
        let i = 0;

        function next() {
            if (i === depList.length) return done(null);
            runTask(depList[i], (err) => {
                if (err) return done(err);
                i++;
                next();
            });
        }

        next();
    }

    runDeps(tasks.map(t => t.id), (err) => {
        if (err) return finalCallback(err);
        finalCallback(null, results);
    });
}


module.exports = runWithDependencies;
