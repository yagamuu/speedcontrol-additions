"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentator = void 0;
var uuid_1 = require("uuid");
var commentator = function (nodecg) {
    var logger = new nodecg.Logger(nodecg.bundleName + ":commentator");
    var commentatorArrayRep = nodecg.Replicant('commentatorArray', {
        defaultValue: []
    });
    var updateCommentator = function (commentator) {
        if (!commentatorArrayRep.value) {
            return;
        }
        var commentatorIndex = commentatorArrayRep.value.findIndex(function (repCommentator) {
            return repCommentator.id === commentator.id;
        });
        if (commentatorIndex < -1) {
            return;
        }
        commentatorArrayRep.value[commentatorIndex] = commentator;
        logger.info("Update commentator " + commentatorIndex);
    };
    var createCommentator = function (_a) {
        var name = _a.name, social = _a.social, assigned = _a.assigned;
        if (!commentatorArrayRep.value) {
            return;
        }
        commentatorArrayRep.value.push({
            id: uuid_1.v4(),
            name: name,
            social: social,
            assignedRunIdArray: assigned
        });
        logger.info("Add commentator " + JSON.stringify({ name: name, social: social, assigned: assigned }));
    };
    var removeCommentator = function (id) {
        if (!commentatorArrayRep.value) {
            return;
        }
        commentatorArrayRep.value = commentatorArrayRep.value.filter(function (commentator) {
            return commentator.id !== id;
        });
        logger.info("Remove commentator, id=" + id);
    };
    nodecg.listenFor('updateCommentator', function (data, ack) {
        updateCommentator(data);
        if (ack && !ack.handled) {
            ack(null);
        }
    });
    nodecg.listenFor('createCommentator', function (data, ack) {
        createCommentator({
            name: data.name,
            social: data.social,
            assigned: data.assignedRunIdArray,
        });
        if (ack && !ack.handled) {
            ack(null);
        }
    });
    nodecg.listenFor('removeCommentator', function (data, ack) {
        removeCommentator(data);
        if (ack && !ack.handled) {
            ack(null);
        }
    });
};
exports.commentator = commentator;
