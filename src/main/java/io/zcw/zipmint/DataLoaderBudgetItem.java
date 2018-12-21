package io.zcw.zipmint;

import io.zcw.zipmint.domain.BudgetItem;
import io.zcw.zipmint.domain.enumeration.Category;
import io.zcw.zipmint.repository.BudgetItemRepository;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.LinkedHashSet;

@Component
public class DataLoaderBudgetItem {

    private BudgetItemRepository budgetItemRepository;
    private LinkedHashSet<BudgetItem> budgetItemSet = new LinkedHashSet<>();

    public DataLoaderBudgetItem(BudgetItemRepository budgetItemRepository) {
        this.budgetItemRepository = budgetItemRepository;
    }

    @PostConstruct
    private void LoadBillItems(){
        BudgetItem foodBudget = new BudgetItem();
        foodBudget.setExpectedSpending(300L);
        foodBudget.setActualSpending(159L);
        foodBudget.setCategory(Category.FOOD);
        budgetItemRepository.save(foodBudget);
        budgetItemSet.add(foodBudget);

        BudgetItem shopBudget = new BudgetItem();
        shopBudget.setExpectedSpending(350L);
        shopBudget.setActualSpending(400L);
        shopBudget.setCategory(Category.SHOPPING);
        budgetItemRepository.save(shopBudget);
        budgetItemSet.add(shopBudget);

        BudgetItem automotivesBudget = new BudgetItem();

    }

    public LinkedHashSet<BudgetItem> getBudgetItemSet() {
        return budgetItemSet;
    }
}
