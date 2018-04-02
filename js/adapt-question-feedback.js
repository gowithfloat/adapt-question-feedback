define(["coreJS/adapt", "coreViews/componentView"], function(Adapt, ComponentView) {
    var FeedbackView = ComponentView.extend({
        initialize: function() {
            ComponentView.prototype.initialize.apply(this, arguments);

            Adapt.on("questionView:showFeedback", this.onQuestionFeedbackRequested, this);
            Adapt.on("notify:opened", this._handleNotify, this);
        },

        preRender: function() {
            this._findAssociatedQuestion();
            this.model.set("_question", Adapt.findById(this.model.get("_questionId")));
        },

        postRender: function() {
            this.setReadyStatus();

            // Remove the "Show Feedback" button on the associated question
            var questionId = this.model.get("_questionId");

            if (!questionId) {
                return;
            }

            var buttons = $(".buttons", "." + questionId);

            $(".buttons-feedback", buttons).remove();
            $(".buttons-marking-icon", buttons).remove();
            $(".buttons-action", buttons).css("width", "100%");
        },

        preRemove: function() {
            Adapt.off("notify:opened", this._handleNotify);
        },

        onQuestionFeedbackRequested: function(questionView) {
            if (questionView.model.get("_id") !== this.model.get("_questionId")) {
                return;
            }

            this.displayFeedback(questionView.model);
        },

        displayFeedback: function(questionModel) {
            questionModel.setupFeedback();

            this.model.set("isCorrect", questionModel.get("_isCorrect"));

            var selectedItems = questionModel.get("_selectedItems");
            var hideDuplicateFeedback = this.model.get("_hideDuplicateFeedback");

            if (hideDuplicateFeedback === true) {
              // filter to only include unique responses
              // _.uniq doesn't work in this case because all the responses have unique properties
              var uniqueItems = [];

              for (var i = 0; i < selectedItems.length; i++) {
                var selectedItem = selectedItems[i];
                var isUnique = true;

                for (var j = 0; j < uniqueItems.length; j++) {
                  var uniqueItem = uniqueItems[j];

                  if (selectedItem.feedback.trim() == uniqueItem.feedback.trim()) {
                    isUnique = false;
                    break;
                  }
                }

                if (isUnique) {
                  uniqueItems.push(selectedItem);
                }
              }

              this.model.set("selectedItems", uniqueItems);
            } else {
              this.model.set("selectedItems", selectedItems);
            }

            this.model.set("feedback", questionModel.get("feedbackMessage"));
            this.render();

            if (this.model.get("_isVisible")) {
                this.setCompletionStatus();
            } else {
                this.model.on("change:_isVisible", this.setCompletionStatus, this);
            }
        },

        _handleNotify: function(notify) {
            var question = this.model.get("_question");
            if (notify.model.get("title") === question.get("title")) {
                notify.disableAnimation = true;
                notify.remove();
                setTimeout(function() {
                    notify.closeNotify();
                }, 1);
            }
        },

        _findAssociatedQuestion: function() {
            if (this.model.get("_questionId") && this.model.get("_questionId").length) {
                return;
            }

            // If a question wasn't manually specified, see if there is a question in the same block
            var question = this.model.getSiblings().findWhere({"_canShowFeedback": true});

            if (!question) {
                // If there isn't a question in the same block, find the immediately preceding question
                var components = this.model.findAncestor().findDescendants("components");
                components.reset(components.first(components.indexOf(this.model)));
                var questions = components.where({"_canShowFeedback": true});

                if (questions.length > 0) {
                    question = questions[questions.length - 1];    
                }
            }
            
            if (!question) {
                return;
            }

            this.model.set("_questionId", question.get("_id"));
        }
    });

    Adapt.register("question-feedback", FeedbackView);

    return FeedbackView;
});
