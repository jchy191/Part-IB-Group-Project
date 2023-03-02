import math
import collections.abc
import enum

def _get_binomial_posterior(_prior: collections.abc.Callable[[float], float], true_count: int, false_count: int,
                            _datapoint_count: int) -> list[any]:
    import numpy as np

    def log(x: float) -> float:
        if x == 0:
            return float("-inf")
        return math.log(x)

    log_probs_of_parameter = []
    linear_range = np.linspace(0, 1, num=_datapoint_count)
    for binomial_parameter in linear_range:
        log_prob_of_parameter = (log(_prior(binomial_parameter))
                                 + log(binomial_parameter) * true_count
                                 + log(1 - binomial_parameter) * false_count)
        log_probs_of_parameter.append(log_prob_of_parameter)
    log_probs_of_parameter = np.array(log_probs_of_parameter)
    log_probs_of_parameter -= np.max(log_probs_of_parameter)
    probs_of_parameter = np.exp(log_probs_of_parameter)
    probs_of_parameter /= np.sum(probs_of_parameter)
    return list((linear_range[i], probs_of_parameter[i]) for i in range(len(linear_range)))


class _WeightsDoNotAddUpException(Exception):
    pass


def get_95_ci(true_count: int, false_count: int) -> tuple[float | None, float | None]:
    """
    Get the Central 95% Confidence Interval for the underlying proportion of "True"s in the dataset.
    Assumes a Uniform prior and that all the datapoints are Independent and Identically Distributed
    :param true_count: The number of trues in the dataset
    :param false_count: The number of falses in the dataset
    :return: A tuple representing the 95% Confidence Interval
    """

    def get_weighted_percentile(weighted_data: list[any], percentile: float) -> float | None:
        if percentile < 50:
            total_prob = 0
            for x, prob in weighted_data:
                total_prob += prob
                if total_prob >= percentile / 100.0:
                    return x
        else:
            # Count from the high side for efficiency
            percentile = 100 - percentile
            total_prob = 0
            for i in range(len(weighted_data) - 1, -1, -1):
                x, prob = weighted_data[i]
                total_prob += prob
                if total_prob >= percentile / 100.0:
                    return x
        raise _WeightsDoNotAddUpException

    binomial_posterior = _get_binomial_posterior(lambda x: x, true_count, false_count, _datapoint_count=10000)
    try:
        low = get_weighted_percentile(binomial_posterior, 2.5)
        high = get_weighted_percentile(binomial_posterior, 97.5)
        return low, high
    except _WeightsDoNotAddUpException:
        return 0, 1

class Majority(enum.Enum):
    STATISTICALLY_FALSE = 0
    MOSTLY_FALSE = 1
    MIXED = 2
    MOSTLY_TRUE = 3
    STATISTICALLY_TRUE = 4

def get_majority(true_count: int, false_count: int) -> Majority:
    low, high = get_95_ci(true_count, false_count)
    if high < 0.5:
        return Majority.STATISTICALLY_FALSE
    if low > 0.5:
        return Majority.STATISTICALLY_TRUE
    proportion = true_count / float(true_count + false_count)
    if proportion > 0.5:
        return Majority.MOSTLY_TRUE
    if proportion < 0.5:
        return Majority.MOSTLY_FALSE
    return Majority.MIXED
